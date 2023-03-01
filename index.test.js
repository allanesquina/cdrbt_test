const crypto = require("crypto");
const { deterministicPartitionKey } = require(".");

// with event and int partition key lower then MAX_PARTITION_KEY_LENGTH
test("should return a string value with no hash", () => {
  const toCompare = 123;
  const event = { partitionKey: toCompare };

  const result = deterministicPartitionKey(event);
  expect(result).toBe(toCompare.toString());
});

// with event and string partition key lower then MAX_PARTITION_KEY_LENGTH
it("should return a string value with no hash", () => {
  const toCompare = "lsfjpaoweifjaweopfi";
  const event = { partitionKey: toCompare };

  const result = deterministicPartitionKey(event);
  expect(result).toBe(toCompare.toString());
});

// with event and partition key greater then MAX_PARTITION_KEY_LENGTH
test("should return a hash of partitionKey", () => {
  const event = {
    partitionKey:
      "8ajwpeofiajwepfoijp2o3i14jp3ojasw90dfjPLASKDHJK!@HLK90swdfpkjhoh9pA*UD_lkjffweh-ASsdjklfhlkajshflkjhlkhlkjhlasjkdfhlkj23lkmansdvlhaslvjkhAIOFJPQW9Jp98jpaqwidjOPQSWIDJPQWOis8asudf8uasdf8uasd8fuasdfawe8fwe89fua0we89fu0f893fpo1i34l123piljfaspdoivupioqweprioqwjepri",
  };

  const toCompare = crypto
    .createHash("sha3-512")
    .update(event.partitionKey)
    .digest("hex");

  const result = deterministicPartitionKey(event);
  expect(result).toBe(toCompare);
});

// with event and no partition key
test("should return a hash", () => {
  const event = {key: "powiepfaweiof"};
  const toCompare = crypto
    .createHash("sha3-512")
    .update(JSON.stringify(event))
    .digest("hex");

  const result = deterministicPartitionKey(event);
  expect(result).toBe(toCompare);
});

// with no event
test("should return default value", () => {
  const result = deterministicPartitionKey();
  expect(result).toBe("0");
});
