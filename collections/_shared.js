Schemas.Location = new SimpleSchema({
  address: {
    type: String,
    label: "Address",
    optional: true
  },
  latitude: {
    type: String,
    label: "Latitude",
    optional: true
  },
  longitude: {
    type: String,
    label: "Longitude",
    optional: true
  }
});
