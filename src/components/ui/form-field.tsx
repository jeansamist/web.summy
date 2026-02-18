import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectWithSearch } from "@/components/ui/select-with-search";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { FunctionComponent, ReactNode, useId, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { InputDateTime } from "../input-date-time.tsx";
import { InputPhoneFlag } from "../input-phone-flag";
import { SelectMultiple } from "../select-multiple";

export type FieldProps = React.ComponentProps<typeof Input> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formReturn: UseFormReturn<any>;
  label: ReactNode;
};

export const InputField: FunctionComponent<FieldProps> = ({
  formReturn,
  type,
  ...props
}) => {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <FormField
      control={formReturn.control}
      name={props.name || ""}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="block w-full" htmlFor={id}>
            {props.label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {type === "tel" ? (
                <InputPhoneFlag
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder={props.placeholder}
                />
              ) : type === "datetime-local" ? (
                <InputDateTime value={field.value} onChange={field.onChange} />
              ) : (
                <Input
                  id={id}
                  {...props}
                  type={
                    type === "password"
                      ? isVisible
                        ? "text"
                        : "password"
                      : type
                  }
                  {...field}
                  value={field.value || ""}
                />
              )}
              {type === "password" && (
                <button
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden="true" />
                  ) : (
                    <EyeIcon size={16} aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export type TextAreaFieldProps = React.ComponentProps<typeof Textarea> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formReturn: UseFormReturn<any>;
  label: ReactNode;
};

export const TextareaField: FunctionComponent<TextAreaFieldProps> = ({
  formReturn,
  ...props
}) => {
  return (
    <FormField
      control={formReturn.control}
      name={props.name || ""}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Textarea {...props} {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export type SelectFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formReturn: UseFormReturn<any>;
  label: ReactNode;
  placeholder?: string;
  name: string;
  items: {
    value: any;
    label: string;
  }[];
  defaultValue?:
    | string
    | {
        value: any;
        label: string;
      }[];
  withSearch?: boolean;
  searchPLaceholder?: string;
  multiselect?: boolean;
};

export const SelectField: FunctionComponent<SelectFieldProps> = ({
  formReturn,
  label,
  name,
  placeholder,
  items,
  defaultValue,
  searchPLaceholder,
  withSearch,
  multiselect,
}) => {
  return (
    <FormField
      control={formReturn.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className="w-full"
            defaultValue={typeof defaultValue === "string" ? defaultValue : ""}
          >
            <FormLabel>{label}</FormLabel>
            {withSearch ? (
              <SelectWithSearch
                items={items}
                onValueChange={field.onChange}
                placeholder={placeholder}
                searchPLaceholder={searchPLaceholder}
                value={field.value && field.value.toString()}
              />
            ) : multiselect ? (
              <SelectMultiple
                placeholder={placeholder}
                value={
                  field.value
                    ? items.filter((item) => field.value.includes(item.value))
                    : field.value
                }
                items={items}
                onValueChange={(v) => {
                  field.onChange(v.map((item) => item.value));
                }}
              />
            ) : (
              <Select
                onValueChange={field.onChange}
                value={field.value && field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full" value={field.value}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-w-[500px] w-full">
                  {items.map((item, key) => (
                    <SelectItem key={key} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
export type DateFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formReturn: UseFormReturn<any>;
  label: ReactNode;
  placeholder?: string;
  disabledDates?: ({ startDate: Date; endDate: Date } | Date)[];
  name: string;
};

export const DateField: FunctionComponent<DateFieldProps> = ({
  label,
  name,
  formReturn,
  placeholder,
  disabledDates,
}) => {
  const isDateDisabled = (date: Date) => {
    // Default disabled conditions
    if (date <= new Date() || date < new Date("1900-01-01")) {
      return true;
    }

    // Check against disabledDates prop
    if (disabledDates && disabledDates.length > 0) {
      return disabledDates.some((disabledDate) => {
        if (disabledDate instanceof Date) {
          // Single date comparison
          return date.toDateString() === disabledDate.toDateString();
        } else {
          // Date range comparison
          const { startDate, endDate } = disabledDate;
          return date >= startDate && date <= endDate;
        }
      });
    }

    return false;
  };

  return (
    <FormField
      control={formReturn.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-4! pr-4 h-9  text-left font-normal bg-transparent hover:bg-transparent dark:bg-input/30 dark:hover:bg-input/30",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={isDateDisabled}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export type InputOTPFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formReturn: UseFormReturn<any>;
  name: string;
  label: ReactNode;
};

export const InputOTPField: FunctionComponent<InputOTPFieldProps> = ({
  formReturn,
  ...props
}) => {
  return (
    <FormField
      control={formReturn.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="block w-full text-center">
            {props.label}
          </FormLabel>
          <FormControl>
            <InputOTP
              containerClassName="justify-center"
              maxLength={6}
              {...field}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage className="text-center w-full" />
        </FormItem>
      )}
    />
  );
};
