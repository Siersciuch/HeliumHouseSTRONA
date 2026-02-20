import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface EditableCellProps {
  value: string;
  onSave?: (newValue: string) => void;
  className?: string;
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

export function EditableCell({ value, onSave, className, children, colSpan, rowSpan }: EditableCellProps) {
  const { user, isImpersonating, realUser } = useAuth();
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  if (!isAdmin) {
    return (
      <TableCell className={className} colSpan={colSpan} rowSpan={rowSpan}>
        {children ?? value}
      </TableCell>
    );
  }

  if (editing) {
    return (
      <TableCell className={cn("p-0", className)} colSpan={colSpan} rowSpan={rowSpan}>
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => {
            setEditing(false);
            if (editValue !== value) onSave?.(editValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditing(false);
              if (editValue !== value) onSave?.(editValue);
            }
            if (e.key === "Escape") {
              setEditing(false);
              setEditValue(value);
            }
          }}
          className="w-full h-full px-4 py-2 bg-transparent border-2 border-primary/50 rounded text-sm focus:outline-none focus:border-primary"
        />
      </TableCell>
    );
  }

  return (
    <TableCell
      className={cn("cursor-pointer hover:bg-accent/40 transition-colors", className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onDoubleClick={() => setEditing(true)}
      title="Kliknij 2x, aby edytować"
    >
      {children ?? value}
    </TableCell>
  );
}
