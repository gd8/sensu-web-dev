export const filterChecks = (checks: Array<any>, nameFilter): Array<any> => {
  return checks.filter((check) => {
    return check.metadata.name.indexOf(nameFilter) > -1;
  });
};
