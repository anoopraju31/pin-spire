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
