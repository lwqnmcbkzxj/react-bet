let events = $('select[name=event_id]');
let users = $('select[name=user_id]');
let adminSelect = $('select.admin-select');

adminSelect.select2();

events.select2();
users.select2();