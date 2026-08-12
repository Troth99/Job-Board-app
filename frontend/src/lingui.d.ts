declare module "*.po" {
  type Messages = import("@lingui/core").Messages;

  export const messages: Messages;
}

declare namespace React {
  interface Attributes {
    _t?: string;
  }
}