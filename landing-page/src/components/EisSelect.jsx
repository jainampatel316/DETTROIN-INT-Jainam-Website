import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

/* Styled dropdown built on Radix Select — accessible, keyboard-driven,
   with typeahead. Rendered without a portal so it inherits the design
   tokens scoped to .site-body. */
export default function EisSelect({ options, value, onChange, placeholder, label }) {
  return (
    <Select.Root value={value || undefined} onValueChange={onChange}>
      <Select.Trigger className="eis-select-btn" aria-label={label}>
        <Select.Value placeholder={<span className="is-placeholder">{placeholder}</span>} />
        <Select.Icon className="eis-select-icon">
          <ChevronDown size={17} strokeWidth={2} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content
        className="eis-list"
        position="popper"
        sideOffset={8}
        collisionPadding={12}
      >
        <Select.Viewport className="eis-viewport">
          {options.map((opt) => (
            <Select.Item key={opt} value={opt} className="eis-opt">
              <Select.ItemText>{opt}</Select.ItemText>
              <Select.ItemIndicator className="eis-opt-check">
                <Check size={15} strokeWidth={2.4} />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
