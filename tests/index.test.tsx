import Mailto, { createMailtoLink, headersToRequest, Headers, MailtoProps } from "../src/index";
import { configure, shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

configure({ adapter: new Adapter() });

test("Mailto create mail to link no headers", () => {
  const mailtoLink = createMailtoLink({ email: "me@theomazars.com" } as MailtoProps);

  expect(mailtoLink).toBe("mailto:me@theomazars.com");
});

test("Mailto create mail to link with one header", () => {
  const mailtoLink = createMailtoLink({
    email: "john.doe@example.com",
    headers: { to: "john.doe@example.com" },
  } as MailtoProps);

  expect(mailtoLink).toBe(`mailto:john.doe@example.com?to=${encodeURIComponent("john.doe@example.com")}`);
});

test("Mailto create mail to link with multiple headers", () => {
  const mailtoLink = createMailtoLink({
    email: "john.doe@example.com",
    headers: {
      to: "john.doe@example.com",
      cc: "john.doe@example.com",
      bcc: "john.doe@example.com",
      from: "john.doe@example.com",
      subject: "Hello",
      text: "Hello World!",
      html: "<html><body><h1>Hello World!</h1></body></html>",
    },
  } as MailtoProps);

  expect(mailtoLink).toBe(
    `mailto:john.doe@example.com?to=${encodeURIComponent("john.doe@example.com")}&cc=${encodeURIComponent(
      "john.doe@example.com",
    )}&bcc=${encodeURIComponent("john.doe@example.com")}&from=${encodeURIComponent(
      "john.doe@example.com",
    )}&subject=Hello&text=${encodeURIComponent("Hello World!")}&html=${encodeURIComponent(
      "<html><body><h1>Hello World!</h1></body></html>",
    )}`,
  );
});

test("Mailto headers to request with one header", () => {
  const headers = { to: "john.doe@example.com" } as Headers;

  expect(headersToRequest(headers)).toBe(`to=${encodeURIComponent("john.doe@example.com")}`);
});

test("Mailto headers to request with multiple headers", () => {
  const headers = {
    to: "john.doe@example.com",
    cc: "john.doe@example.com",
    bcc: "john.doe@example.com",
    from: "john.doe@example.com",
    subject: "Hello",
    text: "Hello World!",
    html: "<html><body><h1>Hello World!</h1></body></html>",
  } as Headers;

  expect(headersToRequest(headers)).toBe(
    `to=${encodeURIComponent("john.doe@example.com")}&cc=${encodeURIComponent(
      "john.doe@example.com",
    )}&bcc=${encodeURIComponent("john.doe@example.com")}&from=${encodeURIComponent(
      "john.doe@example.com",
    )}&subject=Hello&text=${encodeURIComponent("Hello World!")}&html=${encodeURIComponent(
      "<html><body><h1>Hello World!</h1></body></html>",
    )}`,
  );
});

test("Mailto renders simple mailto link", () => {
  const wrapper = render(<Mailto email="john.doe@example.com" />);

  expect(wrapper.text()).toBe("john.doe@example.com");
});

test("Mailto renders simple mailto link href", () => {
  const wrapper = render(<Mailto email="john.doe@example.com" />);

  expect(wrapper.attr().href).toBe("mailto:john.doe@example.com");
});

test("Mailto renders simple mailto link href", () => {
  const wrapper = render(<Mailto email="john.doe@example.com" obfuscated={true} />);

  expect(wrapper.attr().href).toBe("mailto:obfuscated");
});

test("Mailto renders obfuscate children", () => {
  const wrapper = render(
    <Mailto email="john.doe@example.com" obfuscated={true}>
      <span>john.doe@example.com</span>
    </Mailto>,
  );

  expect(wrapper.children().text()).toBe("john.doe@example.com");
});

test("Mailto renders simple obfuscated mailto link", () => {
  const wrapper = render(<Mailto email="john.doe@example.com" obfuscated={true} />);

  expect(wrapper.text()).toBe("moc.elpmaxe@eod.nhoj");
});
