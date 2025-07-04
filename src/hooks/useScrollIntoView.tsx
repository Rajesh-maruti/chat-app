import { useRef } from "react";

export enum ElementEnum {
  lastElement = "lastElement",
  firstElement = "firstElement",
  currentElement = "currentElement",
  element = "element",
}

const useScrollIntoView = () => {
  const ref = useRef<HTMLElement>(null);

  const scrollIntoView = (props: {
    elementToBeScrolled: ElementEnum;
    childElementIndex?: number;
    behavior?: ScrollBehavior;
  }) => {
    const { elementToBeScrolled, childElementIndex, behavior } = props;
    switch (elementToBeScrolled) {
      case ElementEnum.lastElement:
        ref.current?.children[ref.current.children.length - 2]?.scrollIntoView({
          behavior: behavior || "smooth",
          inline: "center",
        });
        break;
      case ElementEnum.firstElement:
        ref.current?.children[0]?.scrollIntoView({
          behavior: behavior || "smooth",
          block: "end",
        });
        break;
      case ElementEnum.currentElement:
        ref.current?.scrollIntoView({
          behavior: behavior || "smooth",
          block: "nearest",
        });
        break;
      case ElementEnum.element:
        if (childElementIndex)
          ref.current?.children.item(childElementIndex)?.scrollIntoView({
            behavior: behavior || "smooth",
            block: "nearest",
          });
        break;
      default:
        break;
    }
  };

  return { ref, scrollIntoView };
};

export default useScrollIntoView;
