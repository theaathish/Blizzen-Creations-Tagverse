import { useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sanitizeHtml } from "@/lib/html-sanitizer";

// Re-export sanitizeHtml for backward compatibility
export { sanitizeHtml } from "@/lib/html-sanitizer";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const COLORS = [
  "#FFFFFF", "#000000", "#374151", "#6B7280", "#9CA3AF",
  "#EF4444", "#F97316", "#EAB308", "#22C55E",
  "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899",
  "#14B8A6", "#06B6D4", "#0EA5E9", "#F43F5E",
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter text...",
  rows = 4,
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Sanitize the value for safe display
  const sanitizedValue = useMemo(() => sanitizeHtml(value), [value]);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Update the value after command execution
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const applyColor = (color: string) => {
    execCommand("foreColor", color);
    setShowColorPicker(false);
  };

  return (
    <div className={`border rounded-md overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 border-b">
        {/* Bold */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        {/* Italic */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        {/* Underline */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("underline")}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Align Left */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("justifyLeft")}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        {/* Align Center */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        {/* Align Right */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("justifyRight")}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        {/* Justify */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("justifyFull")}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Color */}
        <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Text Color"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="grid grid-cols-4 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-6 h-6 rounded hover:scale-110 transition-transform ${
                    color === "#FFFFFF" 
                      ? "border-2 border-gray-400 shadow-inner" 
                      : "border border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => applyColor(color)}
                  title={color === "#FFFFFF" ? "White" : color}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="p-3 min-h-[100px] focus:outline-none prose prose-sm max-w-none bg-slate-800"
        style={{ minHeight: `${rows * 24}px` }}
        onInput={handleInput}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: sanitizedValue }}
        data-placeholder={placeholder}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] {
          color: #f1f5f9;
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
