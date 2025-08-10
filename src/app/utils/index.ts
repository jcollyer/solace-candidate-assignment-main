export const formattedPhone = (phoneNumber: number) =>
  phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
