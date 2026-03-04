# Backend Integration Guide

This document describes how the IGN backend integrates with the api-specs workflow.

## Two Approaches

### 1. Code First (Existing APIs)

For existing APIs, use `@nestjs/swagger` to generate OpenAPI spec from code.

```typescript
// scripts/generate-openapi.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import * as fs from 'fs';

async function generateSpec() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('IGN API')
    .setDescription('IGN Beancount SaaS API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Write to api-specs repo (assume it's cloned as sibling)
  fs.writeFileSync(
    '../api-specs/openapi-generated.yaml',
    JSON.stringify(document, null, 2)
  );

  await app.close();
}

generateSpec();
```

Run with:
```bash
npx ts-node scripts/generate-openapi.ts
```

### 2. Spec First (New APIs)

For new APIs, write the OpenAPI spec first, then implement.

1. Edit `openapi.yaml` in api-specs repo
2. Create PR for review
3. After merge, implement endpoint in IGN backend
4. Use contract tests to verify implementation matches spec

## Contract Testing (Phase 23)

Contract tests verify that the backend implementation matches the OpenAPI spec.

```typescript
// apps/api/src/__tests__/contract/openapi.contract.spec.ts
import { describe, it, expect } from '@jest/globals';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import spec from '../../../api-specs/openapi.yaml';

describe('OpenAPI Contract', () => {
  it('generated spec matches committed spec', async () => {
    const app = await createTestApp();
    const document = SwaggerModule.createDocument(app, new DocumentBuilder().build());

    // Compare critical endpoints
    const paths = Object.keys(spec.paths);
    const generatedPaths = Object.keys(document.paths);

    expect(generatedPaths).toEqual(expect.arrayContaining(paths));
  });
});
```

## Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    API Change Workflow                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  New API:                                                   │
│  1. Edit openapi.yaml → PR → Review → Merge                │
│  2. npm install @firela/api-types@canary                   │
│  3. Implement endpoint in IGN backend                       │
│  4. Contract test verifies implementation                   │
│                                                             │
│  Existing API:                                              │
│  1. Modify NestJS controller                                │
│  2. Run generate-openapi.ts script                         │
│  3. Copy spec changes to openapi.yaml                      │
│  4. PR → Review → Merge                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Sync Script

```bash
#!/bin/bash
# scripts/sync-openapi.sh

# Generate spec from backend
npx ts-node scripts/generate-openapi.ts

# Copy to api-specs repo
cp openapi-generated.yaml ../api-specs/openapi.yaml

# Regenerate types
cd ../api-specs
npm run generate

# Commit if changed
git diff --exit-code openapi.yaml || \
  git commit -am "chore: sync OpenAPI spec from IGN backend"
```

## Best Practices

### 1. DTO Alignment

Ensure your DTOs have proper Swagger decorators:

```typescript
// create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: '2024-11-28', description: 'Transaction date' })
  @IsDateString()
  date: string;

  @ApiProperty({ 
    enum: ['*', '!'], 
    default: '*',
    description: 'Transaction flag'
  })
  @IsOptional()
  @IsEnum(['*', '!'])
  flag?: string;

  // ... more fields
}
```

### 2. Response Types

Always specify response types:

```typescript
@Post()
@ApiCreatedResponse({ type: TransactionResponseDto })
async create(@Body() dto: CreateTransactionDto): Promise<TransactionResponseDto> {
  // ...
}
```

### 3. Error Responses

Document error responses:

```typescript
@ApiBadRequestResponse({ 
  description: 'Invalid request parameters',
  type: ApiProblemResponseDto 
})
@ApiUnauthorizedResponse({ description: 'Authentication required' })
```

## Manual vs Generated Spec

| Aspect | Manual (openapi.yaml) | Generated (SwaggerModule) |
|--------|----------------------|---------------------------|
| Source of Truth | ✅ This file | For reference |
| Type Accuracy | Manual sync | Auto from DTOs |
| Documentation | Full descriptions | From decorators |
| Review Process | PR required | No review |

**Recommendation**: Keep `openapi.yaml` as source of truth. Use generated spec for validation only.
