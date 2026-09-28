import type { BooleanInputProps } from "sanity";

/** Match the website: only an explicit false hides content. No data is changed on render. */
export default function VisibleByDefaultInput(props: BooleanInputProps) {
  return props.renderDefault({ ...props, value: props.value !== false });
}
