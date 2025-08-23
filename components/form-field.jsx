import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormField({ label, id, type = "text", placeholder, error, register, className, ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn("transition-colors", error && "border-destructive focus-visible:ring-destructive", className)}
        {...register}
        {...props}
      />
      {error && <p className="text-sm text-destructive font-medium">{error.message}</p>}
    </div>
  )
}
