import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TimesheetEntry from "./TimesheetEntry";

export default {
  title: "App/TimesheetEntry",
  component: TimesheetEntry,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TimesheetEntry>;

const Template: ComponentStory<typeof TimesheetEntry> = (args) => (
  <TimesheetEntry {...args} />
);

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  taskOptions: [
    { id: 23, name: "test" },
    { id: 25, name: "test 2" },
  ],
  deleteHandler: () => {},
  data: { date: new Date(), hours: 2, id: 1, taskId: 23 },
};
