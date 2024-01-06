import classes from "./PageHeader.module.css";

export const PageHeader = ({ title }) => {
  return <div className={classes.title_styles}>{title}</div>;
};

export default PageHeader;
