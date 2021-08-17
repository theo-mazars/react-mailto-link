import { FC, MouseEventHandler } from "react";

export type Headers = {
  to?: string;
  cc?: string;
  bcc?: string;
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
};

export type MailtoProps = {
  email: string;
  obfuscated?: boolean;
  headers?: Headers;
  children?: JSX.Element;
  reverse?: boolean;
  className?: string;
  style?: object;
};

export type ObfuscateProps = {
  email: string;
};

export const headersToRequest = (headers: Headers): string => {
  return Object.entries(headers)
    .map(([key, value]: string[]) => {
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

export const createMailtoLink = ({ email, headers }: MailtoProps): string => {
  if (!headers) {
    return `mailto:${email}`;
  }

  return `mailto:${email}?${headersToRequest(headers)}`;
};

const Mailto: FC<MailtoProps> = ({
  children,
  className,
  headers,
  email,
  obfuscated,
  style,
}: MailtoProps): JSX.Element => {
  function handleClick(e: any): void {
    e.preventDefault();
    window.open(createMailtoLink({ email, headers }));
  }

  const Obfuscate: FC<ObfuscateProps> = (
    props: ObfuscateProps
  ): JSX.Element => (
    <span
      style={{
        unicodeBidi: "bidi-override",
        direction: "rtl",
        WebkitTransform: "rotateY(180deg)",
        msTransform: "rotateY(180deg)",
        OTransform: "rotateY(180deg)",
      }}
    >
      {props.email.split("").reverse().join("")}
    </span>
  );

  return obfuscated ? (
    <a
      onClick={handleClick}
      href={"mailto:obfuscated"}
      className={className}
      style={style}
    >
      {children || <Obfuscate email={email} />}
    </a>
  ) : (
    <a href={`mailto:${email}`} className={className} style={style}>
      {children || email}
    </a>
  );
};

export default Mailto;
