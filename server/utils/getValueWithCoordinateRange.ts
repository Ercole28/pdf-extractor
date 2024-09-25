import { TransformedItem } from "../typings/all";

interface GetValueWithCoordinateRangeProps {
  data: TransformedItem[];
  x2ValueUnknown: boolean;
  x1: number;
  x2?: number;
  y1: number;
  y2: number;
  separator: string;
  sort?: boolean;
}

const getValueWithCoordinateRange = ({
  data,
  x2ValueUnknown,
  x1,
  x2,
  y1,
  y2,
  separator,
  sort = false,
}: GetValueWithCoordinateRangeProps): string => {
  return x2ValueUnknown
    ? sort
      ? data
          .filter(
            (item) =>
              item.position.x >= x1 &&
              item.position.y >= y1 &&
              item.position.y <= y2
          )
          .sort((a, b) => a.position.x - b.position.x)
          .map((item) => item.text)
          .join(separator)
      : data
          .filter(
            (item) =>
              item.position.x >= x1 &&
              item.position.y >= y1 &&
              item.position.y <= y2
          )
          .map((item) => item.text)
          .join(separator)
    : sort
    ? data
        .filter(
          (item) =>
            item.position.x >= x1 &&
            item.position.x <= x2! &&
            item.position.y >= y1 &&
            item.position.y <= y2
        )
        .sort((a, b) => a.position.x - b.position.x)
        .map((item) => item.text)
        .join(separator)
    : data
        .filter(
          (item) =>
            item.position.x >= x1 &&
            item.position.x <= x2! &&
            item.position.y >= y1 &&
            item.position.y <= y2
        )
        .map((item) => item.text)
        .join(separator);
};

export default getValueWithCoordinateRange;
