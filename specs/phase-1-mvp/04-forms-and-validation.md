# Phase 1 Specification: Compound `<Form />` System & Zod Schemas

## 1. Compound `<Form />` Component System

All forms across the application must strictly use this unified compound component implementation located in `components/ui/form/index.tsx`.

### `components/ui/form/index.tsx`

```tsx
'use client';

import { type ComponentProps, createContext, FC, type ReactNode, useContext, useId } from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

// 1️⃣ Form -> FormProvider
const Form = FormProvider;

// 2️⃣ FormField Context
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

// 3️⃣ FormField component -> provides context and uses Controller
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// 4️⃣ FormItem Context
type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

// 5️⃣ useFormField hook -> returns useful field state & context values
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// 6️⃣ FormItem component -> provides id context
type FormItemProps = ComponentProps<'div'>;

const FormItem: FC<FormItemProps> = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('mb-4 flex flex-col gap-1.5', className ?? '')} {...props} />
    </FormItemContext.Provider>
  );
};

// 7️⃣ FormLabel component
type FormLabelProps = ComponentProps<'label'>;

const FormLabel: FC<FormLabelProps> = ({ className, ...props }) => {
  const { error, formItemId } = useFormField();

  return (
    <label
      data-slot="form-label"
      htmlFor={formItemId}
      className={cn('text-sm font-semibold', error ? 'text-error' : 'text-ink', className ?? '')}
      {...props}
    />
  );
};

// 8️⃣ FormControl component -> wraps input/select/textarea
type FormControlProps = ComponentProps<'div'> & { children: ReactNode };

const FormControl: FC<FormControlProps> = ({ children, ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  const ariaDescribedBy = error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`;

  return (
    <div id={formItemId} aria-describedby={ariaDescribedBy} aria-invalid={!!error} {...props}>
      {children}
    </div>
  );
};

// 9️⃣ FormDescription component
type FormDescriptionProps = ComponentProps<'p'>;

const FormDescription: FC<FormDescriptionProps> = ({ className, ...props }) => {
  const { formDescriptionId } = useFormField();

  return <p id={formDescriptionId} className={cn('text-ink-muted text-xs', className ?? '')} {...props} />;
};

// 🔟 FormMessage component
type FormMessageProps = ComponentProps<'p'>;

const FormMessage: FC<FormMessageProps> = ({ className, ...props }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) return null;

  return (
    <p id={formMessageId} className={cn('text-error text-xs font-medium', className ?? '')} {...props}>
      {body}
    </p>
  );
};

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField };
```

---

## 2. Zod Validation Contracts (`lib/validations/`)

### Auth Validation (`lib/validations/auth.ts`)

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Please enter your username or email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(50).trim(),
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms & privacy policy' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
```

### Post Validation (`lib/validations/post.ts`)

```typescript
import { z } from 'zod';

export const orientationEnum = z.enum(['PORTRAIT', 'LANDSCAPE', 'SQUARE']);

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120, 'Title cannot exceed 120 characters').trim(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().or(z.literal('')),
  categoryId: z.string().min(1, 'Please select a category'),
  tagIds: z.array(z.string()).min(1, 'Please select at least one tag').max(5, 'Maximum 5 tags allowed'),
  destinationUrl: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Image upload is required'),
  imageKey: z.string().min(1, 'Image key is required'),
  orientation: orientationEnum.default('PORTRAIT'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
```

---

## 3. Form Implementation Tracking Checklist

- [x] **Sub-step 4.1: UI Form Core & Zod Validation Setup**
  - [x] Install dependencies: `react-hook-form`, `zod`, `@hookform/resolvers`
  - [x] Create `components/ui/form/index.tsx` with pure Tailwind CSS classes
  - [x] Create `lib/validations/auth.ts` (`loginSchema`, `registerSchema`)
  - [x] Create `lib/validations/post.ts` (`createPostSchema`)
