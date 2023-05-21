import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '../styled';

const CustomInput = forwardRef(({ value, ...restProps }, ref) => (
    <Input defaultValue={value} {...restProps} ref={ref} />
));

const CustomDatePicker = ({ id, selected, onChange, disabled }) => {
    return (
        <DatePicker
            id={id}
            selected={selected}
            onChange={onChange}
            disabled={disabled}
            customInput={<CustomInput />}
            autoComplete='off'
            placeholderText='Click to select a date'
            dropdownMode='select'
            showMonthDropdown
            showYearDropdown
        />
    );
};

export default CustomDatePicker;
