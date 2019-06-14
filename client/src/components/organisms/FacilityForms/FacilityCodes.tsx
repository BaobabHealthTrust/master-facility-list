import React, { useState, useEffect } from "react";
import Button from "../../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Modal, withStyles, Paper, Grid, TextField } from "@material-ui/core";
import styled from "styled-components";
import Card from "../../atoms/Card";

function FacilityCodes(props: Props) {
  const [systems, setSystems] = useState([
    { system: "", code: "", url: "" }
  ] as Array<any>);
  const [open, setOpen] = useState(false);

  const onSave = () => {
    let systemsClone = systems.filter(
      val => val.system != "" && val.code != "" && val.url != ""
    );
    props.setFieldValue("facility_code_mapping", systemsClone);
    setOpen(false);
  };

  useEffect(() => {
    if (props.systems) setSystems([...props.systems, ...systems]);
  }, [props.systems]);

  const onChange = (index: number, value: any, field: any) => {
    let systemsCopy: Array<any> = [...systems];
    systemsCopy[index][field] = value;
    setSystems(systemsCopy);

    if (index == systems.length - 1 && field == "url") {
      onAdd();
    }
  };
  const onAdd = () => {
    setSystems([...systems, { system: "", code: "", url: "" }]);
  };

  const onRemove = (index: number) => {
    let systemsClone = [...systems];
    systemsClone.splice(index, 1);
    setSystems(systemsClone);
  };

  return (
    <>
      <Button
        icon={<FontAwesomeIcon icon={faLink} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Map Codes
      </Button>
      <StyledModal open={open}>
        <ModalContainer>
          <Paper>
            <>
              <Card
                style={{ minHeight: "300px" }}
                bodyStyle={{ marginBottom: "0px" }}
                heading="Add New User"
              >
                <Grid container spacing={24}>
                  {systems.map((sys, index) => (
                    <>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                          value={systems[index].system}
                          name="name"
                          label="Name"
                          placeholder="Enter Name"
                          onChange={e =>
                            onChange(index, e.target.value, "system")
                          }
                        />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                          value={systems[index].code}
                          name="code"
                          label="Code"
                          placeholder="Enter Code"
                          onChange={e =>
                            onChange(index, e.target.value, "code")
                          }
                        />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <TextField
                          value={systems[index].url}
                          name="url"
                          label="Url"
                          placeholder="Enter url"
                          onChange={e => onChange(index, e.target.value, "url")}
                        />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Button
                            style={{
                              borderRadius: "50%",
                              minWidth: "30px",
                              height: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "0px"
                            }}
                            theme="warning"
                            icon={<FontAwesomeIcon icon={faMinus} />}
                            onClick={() => {
                              onRemove(index);
                            }}
                          />
                        </div>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Card>
              <ModalFooter>
                <Button onClick={onSave}>Save Configuration</Button>
                <Button
                  theme="default"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Or Cancel
                </Button>
              </ModalFooter>
            </>
          </Paper>
        </ModalContainer>
      </StyledModal>
    </>
  );
}

export default FacilityCodes;

type Props = {
  systems: Array<any>;
  setFieldValue: Function;
};

const StyledModal = withStyles({
  root: {
    zIndex: 1500,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    "& :active": {
      outline: "none"
    }
  }
})(Modal);

const ModalContainer = styled.div`
  width: 800px;
  margin: auto;
`;

const ModalFooter = styled.div`
  padding: 20px;
  background: #eaeaea;
  text-align: right;
`;
