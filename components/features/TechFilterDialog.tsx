import { useState } from 'react';
import { techIcons } from '@/lib/data/icons';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import CustomIcon from '@/components/ui/Icon';
import Input from '@/components/ui/Input';

interface TechFilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTechs: string[];
  onApply: (selected: string[]) => void;
}

export default function TechFilterDialog({
  isOpen,
  onClose,
  selectedTechs,
  onApply,
}: TechFilterDialogProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedTechs);
  const [searchQuery, setSearchQuery] = useState('');

  const allIcons = Object.values(techIcons);

  const filteredIcons = allIcons.filter((icon) =>
    icon.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTech = (label: string) => {
    setInternalSelected((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handleApply = () => {
    onApply(internalSelected);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter by Technologies">
      <div className="flex flex-col h-[60vh] md:h-[500px]">
        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto min-h-0 border rounded-xl p-4 bg-secondary/10">
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredIcons.map((icon) => {
              const isSelected = internalSelected.includes(icon.label);
              return (
                <button
                  key={icon.label}
                  onClick={() => toggleTech(icon.label)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center
                    ${
                      isSelected
                        ? 'bg-primary/10 border-primary shadow-sm scale-95'
                        : 'bg-background border-border hover:border-primary/50 hover:bg-secondary/20'
                    }
                  `}
                >
                  <CustomIcon.fromIcon
                    icon={icon}
                    className={`w-8 h-8 mb-2 ${isSelected ? 'opacity-100' : 'opacity-70 grayscale'}`}
                  />
                  <span className="text-xs font-medium truncate w-full">{icon.label}</span>
                </button>
              );
            })}

            {filteredIcons.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No technologies found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">{internalSelected.length} selected</div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setInternalSelected([])} size="sm">
              Clear All
            </Button>
            <Button onClick={handleApply} size="sm">
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
