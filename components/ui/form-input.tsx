// components/ui/form-input.tsx

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
  label,
  placeholder,
  type = "text",
  required,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1E293B]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-[40px] px-3 rounded-[8px] border border-[#bdcdd0] text-[13px] text-[#1E293B] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white"
      />
    </div>
  );
}