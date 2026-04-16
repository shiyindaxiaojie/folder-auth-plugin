'use strict';

// noinspection JSUnusedGlobalSymbols
const getSelectedValues = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return [];
    return Array.from(element.selectedOptions).map(option => option.value);
};

/**
 * Adds a global role
 */
function addGlobalRole() {
    const roleName = document.getElementById('globalRoleName').value;
    if (!roleName || roleName.length < 3) {
        alert('Please enter a valid name for the role to be added.');
        return;
    }

    const response = {
        name: roleName,
        permissions: getSelectedValues('global-permission-select'),
    };

    if (response.permissions.length <= 0) {
        alert('Please select at least one permission');
        return;
    }

    sendPostRequest(`${rootURL}/folder-auth/addGlobalRole`, response);
};

// noinspection JSUnusedGlobalSymbols
/**
 * Adds a Folder Role
 */
function addFolderRole() {
    const roleName = document.getElementById('folderRoleName').value;
    if (!roleName || roleName.length < 3) {
        alert('Please enter a valid name for the role to be added');
        return;
    }

    const response = {
        name: roleName,
        permissions: getSelectedValues('folder-permission-select'),
        folderNames: getSelectedValues('folder-select'),
    };

    if (!response.permissions || response.permissions.length <= 0) {
        alert('Please select at least one permission');
        return;
    }

    if (!response.folderNames || response.folderNames.length <= 0) {
        alert('Please select at least one folder on which this role will be applicable');
        return;
    }

    sendPostRequest(`${rootURL}/folder-auth/addFolderRole`, response);
};

// noinspection JSUnusedGlobalSymbols
/**
 * Adds an agent Role
 */
function addAgentRole() {
    const roleName = document.getElementById('agentRoleName').value;
    if (!roleName || roleName.length < 3) {
        alert('Please enter a valid name for the role to be added');
        return;
    }

    const response = {
        name: roleName,
        agentNames: getSelectedValues('agent-select'),
        permissions: getSelectedValues('agent-permission-select'),
    };

    if (!response.permissions || response.permissions.length <= 0) {
        alert('Please select at least one permission');
        return;
    }

    if (!response.agentNames || response.agentNames.length <= 0) {
        alert('Please select at least one agent on which this role will be applicable');
        return;
    }

    sendPostRequest(`${rootURL}/folder-auth/addAgentRole`, response);
};

/**
 * Sends a POST request to {@code postUrl}
 * @param postUrl the URL
 * @param json JSON data to be sent
 */
function sendPostRequest(postUrl, json) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // Jelly file sets up the crumb value for CSRF protection
    if (typeof crumb !== 'undefined' && crumb.value) {
        xhr.setRequestHeader(crumb.name || 'Jenkins-Crumb', crumb.value);
    }

    xhr.onload = () => {
        if (xhr.status === 200) {
            alert('The role was added successfully');
            location.reload(); // refresh the page
        } else {
            alert('Unable to add the role\n' + xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(json));
};
