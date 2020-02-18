const colorChoice = {
  color: [
    "0,0,0",
    "11,156,49",
    "255,255,0",
    "153,51,102",
    "0,0,225",
    "255,0,0"
  ],
  fillOpacity: "0.3",
  lineOpacity: "0.1",
  hoverOpacity: "0.9"
};

const pointStyleOptions = [
  "circle",
  "cross",
  "crossRot",
  "dash",
  "line",
  "rect",
  "rectRound",
  "rectRot",
  "star",
  "triangle"
];

export const data = {
  // export const graph1 = {
  title: "Graph Title",
  description: "some kind of detail here",
  userName: "Customer's Name...",

  labels: ["branch1", "branch2", "branch3", "branch4", "branch5", "branch6"],
  datasets: [
    {
      id: 1,
      label: "DataSet1", //dataset label, NOT each branch
      data: [93, 66, 55, 49, 93, 18], //data that gets graphed
      backgroundColor: `rgba(${colorChoice.color[1]},${colorChoice.fillOpacity})`,
      borderColor: `rgba(${colorChoice.color[1]},${colorChoice.lineOpacity})`,
      hoverBackgroundColor: `rgba(${colorChoice.color[1]},${colorChoice.hoverOpacity})`
    },
    {
      id: 2,
      label: "DataSet2", //dataset label, NOT each branch
      data: [33, 45, 66, 97, 12, 33], //data that gets graphed
      backgroundColor: `rgba(${colorChoice.color[2]},${colorChoice.fillOpacity})`,
      borderColor: `rgba(${colorChoice.color[2]},${colorChoice.lineOpacity})`,
      hoverBackgroundColor: `rgba(${colorChoice.color[2]},${colorChoice.hoverOpacity})`
    },
    {
      id: 3,
      label: "DataSet3", //dataset label, NOT each branch
      data: [12, 51, 33, 12, 77, 3], //data that gets graphed
      backgroundColor: `rgba(${colorChoice.color[3]},${colorChoice.fillOpacity})`,
      borderColor: `rgba(${colorChoice.color[3]},${colorChoice.lineOpacity})`,
      hoverBackgroundColor: `rgba(${colorChoice.color[3]},${colorChoice.hoverOpacity})`
    }
  ]
};

export const data2 = {
  graphs: [
    {
      id: 1,
      title: "Graph Title",
      description: "some kind of detail here",
      userName: "Customer's Name...",

      labels: [
        "branch1",
        "branch2",
        "branch3",
        "branch4",
        "branch5",
        "branch6"
      ],
      datasets: [
        {
          id: 1,
          dataset_label: "DataSet1", //dataset label, NOT each branch
          data: [93, 66, 55, 49, 93, 18], //data that gets graphed
          //
          backgroundColor: `rgba(${colorChoice.color[1]},${colorChoice.fillOpacity})`,
          borderColor: `rgba(${colorChoice.color[1]},${colorChoice.lineOpacity})`,
          hoverBackgroundColor: `rgba(${colorChoice.color[1]},${colorChoice.hoverOpacity})`
        },
        {
          id: 2,
          dataset_label: "DataSet2", //dataset label, NOT each branch
          data: [33, 45, 66, 97, 12, 33], //data that gets graphed
          //
          backgroundColor: `rgba(${colorChoice.color[2]},${colorChoice.fillOpacity})`,
          borderColor: `rgba(${colorChoice.color[2]},${colorChoice.lineOpacity})`,
          hoverBackgroundColor: `rgba(${colorChoice.color[2]},${colorChoice.hoverOpacity})`
        },
        {
          id: 3,
          dataset_label: "DataSet3", //dataset label, NOT each branch
          data: [12, 51, 33, 12, 77, 3], //data that gets graphed
          //
          backgroundColor: `rgba(${colorChoice.color[3]},${colorChoice.fillOpacity})`,
          borderColor: `rgba(${colorChoice.color[3]},${colorChoice.lineOpacity})`,
          hoverBackgroundColor: `rgba(${colorChoice.color[3]},${colorChoice.hoverOpacity})`
        }
      ]
    },
    {
      id: 2,
      title: "Graph Title Dos",
      description: "Different details here",
      userName: "Customer's Name...",

      labels: ["Label1", "Label2", "Label3", "Label4", "Label5", "Label6"],
      datasets: [
        {
          id: 1,
          dataset_label: "DataSet1", //dataset label, NOT each branch
          data: [55, 66, 88, 45, 65, 78], //data that gets graphed
          //
          backgroundColor: `rgba(${colorChoice.color[1]},${colorChoice.fillOpacity})`,
          borderColor: `rgba(${colorChoice.color[1]},${colorChoice.lineOpacity})`,
          hoverBackgroundColor: `rgba(${colorChoice.color[1]},${colorChoice.hoverOpacity})`
        },
        {
          id: 2,
          dataset_label: "DataSet2", //dataset label, NOT each branch
          data: [45, 65, 78, 49, 76, 94], //data that gets graphed
          //
          backgroundColor: `rgba(${colorChoice.color[2]},${colorChoice.fillOpacity})`,
          borderColor: `rgba(${colorChoice.color[2]},${colorChoice.lineOpacity})`,
          hoverBackgroundColor: `rgba(${colorChoice.color[2]},${colorChoice.hoverOpacity})`
        },
        {
          id: 3,
          dataset_label: "DataSet3", //dataset label, NOT each branch
          data: [34, 5, 45, 78, 98, 65, 34], //data that gets graphed
          //
          backgroundColor: `rgba(${colorChoice.color[3]},${colorChoice.fillOpacity})`,
          borderColor: `rgba(${colorChoice.color[3]},${colorChoice.lineOpacity})`,
          hoverBackgroundColor: `rgba(${colorChoice.color[3]},${colorChoice.hoverOpacity})`
        }
      ]
    }
  ]
};
