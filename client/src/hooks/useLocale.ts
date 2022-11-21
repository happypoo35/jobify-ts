interface Props {
  options?: Intl.DateTimeFormatOptions;
  format?: Intl.LocalesArgument;
}

const useLocale = ({ options = {}, format = "en-EN" }: Props) => {
  const dateOptions: Props["options"] = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  const localeDate = (date: string | number | Date) =>
    new Date(date).toLocaleString(format, dateOptions);

  return localeDate;
};

export default useLocale;
