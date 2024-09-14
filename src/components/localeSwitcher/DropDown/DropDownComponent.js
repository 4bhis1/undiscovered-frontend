import {useState} from 'react';
import {CaretDownIcon, CaretUpIcon} from '@radix-ui/react-icons';
import * as Dropdown from './index';

export function DropDownComponent(props) {
  // const {options} = props;
  const options = [
    {
      value: 'One',
      label: 'One',
    },
    {
      value: 'Two',
      label: 'Two',
    },
    {
      value: 'Three',
      label: 'Three',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedItem] = useState('One');

  function setItem(e) {
    const target = e.target;
    setSelectedItem(target.textContent ?? 'unknown');
  }

  return (
    <Dropdown.DropdownMenu onOpenChange={setIsOpen}>
      <Dropdown.DropdownMenuTrigger>
        {selectedValue} {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
      </Dropdown.DropdownMenuTrigger>
      <Dropdown.DropdownMenuContent>
        {options.map(option => (
          <Dropdown.DropdownMenuItem key={option.value} onSelect={setItem}>
            {option.label}
          </Dropdown.DropdownMenuItem>
        ))}
      </Dropdown.DropdownMenuContent>
    </Dropdown.DropdownMenu>
  );
}
