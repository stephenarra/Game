interface Props {
  title: string;
  value: string;
  name?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

type WithTitleProps = {
  title: string;
};

function withTitle<P>(Component: React.ComponentType<P>) {
  return (props: P & WithTitleProps) => (
    <label className="block my-4">
      <span className="text-gray-700">{props.title}</span>
      <Component {...props} />
    </label>
  );
}

export const Input = withTitle(
  ({ value, name, placeholder, onChange }: Props) => (
    <input
      type="text"
      name={name}
      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
);

export const TextArea = withTitle(
  ({ value, name, placeholder, onChange }: Props) => (
    <textarea
      name={name}
      rows={3}
      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
);

export default Input;
