// components/ui/form-textarea.tsx

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextarea({
  label,
  placeholder,
  required,
  value,
  onChange,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1E293B]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full px-3 py-2.5 rounded-[8px] border border-[#bdcdd0] text-[13px] text-[#1E293B] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#3B82F6] transition-colors bg-white resize-none"
      />
    </div>
  );
}