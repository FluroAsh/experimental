// import { ReactElement } from 'react'

type FormFieldProps = {
  label: string
  name: string
  // type?: React.InputHTMLAttributes<HTMLInputElement>['type']
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormField({ label, name, type = 'text', ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-bold text-xs mb-[2px]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="p-1 pl-2 rounded-sm text-neutral-900 bg-neutral-400 focus:bg-neutral-300"
        {...props}
      />
    </div>
  )
}
