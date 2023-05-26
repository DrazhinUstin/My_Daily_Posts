import { Input } from '../styled';

const FormField = ({
    type = 'text',
    name,
    value,
    onChange,
    disabled,
    required,
    labelText,
    children,
    ...restProps
}) => {
    return (
        <div>
            <label htmlFor={name}>{labelText || name[0].toUpperCase() + name.slice(1) + ':'}</label>
            {children ? (
                <Input
                    as='select'
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    {...restProps}
                >
                    {children}
                </Input>
            ) : (
                <Input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    {...restProps}
                />
            )}
        </div>
    );
};

export default FormField;
