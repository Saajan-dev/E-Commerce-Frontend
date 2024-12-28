import { LoaderProps } from "../@types/component";
import classes from "./ComponentsStyle.module.css";

export default function Loader({ isVisible = false }: LoaderProps) {
  return isVisible ? (
    <div className={classes.loaderParent}>
      <div className={classes.loader}></div>
    </div>
  ) : null;
}
