// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PageHeader from "../Common/PageHeader/PageHeader";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { containerForHeader } from "../Common/FormComponents/common/styleLibrary";
import ErrorLogs from "./ErrorLogs/ErrorLogs";
import LogsSearchMain from "./LogSearch/LogsSearchMain";
import { AppState } from "../../../store";

interface ILogsMainProps {
  classes: any;
  features: string[] | null;
}

const styles = (theme: Theme) =>
  createStyles({
    headerLabel: {
      fontSize: 22,
      fontWeight: 600,
      color: "#000",
      marginTop: 4,
    },
    ...containerForHeader(theme.spacing(4)),
  });

const LogsMain = ({ classes, features }: ILogsMainProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const logSearchEnabled = features && features.includes("log-search");

  return (
    <Fragment>
      <PageHeader label="Logs" />
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <List component="nav" dense={true}>
            <ListItem
              button
              selected={currentTab === 0}
              onClick={() => {
                setCurrentTab(0);
              }}
            >
              <ListItemText primary="Error Logs" />
            </ListItem>
            <ListItem
              button
              selected={currentTab === 1}
              disabled={!logSearchEnabled}
              onClick={() => {
                setCurrentTab(1);
              }}
            >
              <ListItemText primary="Audit Logs" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={10}>
          {currentTab === 0 && (
            <Fragment>
              <h1 className={classes.sectionTitle}>Error Logs</h1>
              <ErrorLogs />
            </Fragment>
          )}
          {currentTab === 1 && logSearchEnabled && (
            <Fragment>
              <h1 className={classes.sectionTitle}>Audit Logs</h1>
              <LogsSearchMain />
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapState = (state: AppState) => ({
  features: state.console.session.features,
});

const connector = connect(mapState, null);

export default withStyles(styles)(connector(LogsMain));
