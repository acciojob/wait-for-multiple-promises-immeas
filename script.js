//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");

  // Initially display 'Loading...'
  output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  function createPromise(index) {
    return new Promise((resolve) => {
      const timeTaken = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
      setTimeout(() => resolve({ index, timeTaken }), timeTaken * 1000);
    });
  }

  // Create three promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove the loading row
    output.innerHTML = "";

    // Append each promise result to the table
    results.forEach(({ index, timeTaken }) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>Promise ${index}</td><td>${timeTaken}</td>`;
      output.appendChild(row);
    });

    // Calculate total time taken (maximum of all promise times)
    const totalTime = Math.max(...results.map(({ timeTaken }) => parseFloat(timeTaken))).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td><strong>Total</strong></td><td>${totalTime}</td>`;
    output.appendChild(totalRow);
  });
});

