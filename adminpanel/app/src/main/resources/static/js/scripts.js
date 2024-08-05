$(document).ready(function() {
    // Handle login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: '/api/users/login',
            type: 'POST',
            data: JSON.stringify({ username: username, password: password }),
            contentType: 'application/json',
            success: function(response) {
                window.location.href = '/dashboard.html';
            },
            error: function(error) {
                alert('Login failed. Please check your credentials.');
            }
        });
    });

    // Handle registration
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: '/api/users/register',
            type: 'POST',
            data: JSON.stringify({ username: username, password: password }),
            contentType: 'application/json',
            success: function(response) {
                alert('Registration successful.');
                window.location.href = '/index.html';
            },
            error: function(error) {
                alert('Registration failed. ' + error.responseText);
            }
        });
    });

    // Handle search
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        const query = $('#searchQuery').val();

        $.ajax({
            url: '/api/energy-meters/search',
            type: 'GET',
            data: { query: query },
            success: function(response) {
                populateTable(response);
            },
            error: function(error) {
                alert('Failed to fetch energy meters.');
            }
        });
    });

    // Handle add meter
    $('#addMeterForm').on('submit', function(e) {
        e.preventDefault();
        const meterId = $('#meterId').val();
        const location = $('#location').val();
        const status = $('#status').val();

        $.ajax({
            url: '/api/energy-meters',
            type: 'POST',
            data: JSON.stringify({ meterId: meterId, location: location, status: status }),
            contentType: 'application/json',
            success: function(response) {
                alert('Energy meter added successfully.');
                $('#addMeterForm')[0].reset();
                loadMeters();
            },
            error: function(error) {
                alert('Failed to add energy meter.');
            }
        });
    });

    // Load meters on page load
    function loadMeters() {
        $.ajax({
            url: '/api/energy-meters',
            type: 'GET',
            success: function(response) {
                populateTable(response);
            },
            error: function(error) {
                alert('Failed to fetch energy meters.');
            }
        });
    }

    // Populate table with energy meters
    function populateTable(meters) {
        const tableBody = $('#meterTableBody');
        tableBody.empty();
        meters.forEach(function(meter) {
            const row = `<tr>
                <td>${meter.id}</td>
                <td>${meter.meterId}</td>
                <td>${meter.location}</td>
                <td>${meter.status}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${meter.id}">Delete</button>
                </td>
            </tr>`;
            tableBody.append(row);
        });

        // Handle delete
        $('.delete-btn').on('click', function() {
            const id = $(this).data('id');

            $.ajax({
                url: `/api/energy-meters/${id}`,
                type: 'DELETE',
                success: function(response) {
                    alert('Energy meter deleted successfully.');
                    loadMeters();
                },
                error: function(error) {
                    alert('Failed to delete energy meter.');
                }
            });
        });
    }

    loadMeters();
});
