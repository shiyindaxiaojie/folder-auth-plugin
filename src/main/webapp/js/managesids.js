'use strict';

/**
 * Assign a sid to a role.
 *
 * @param roleType {('agent' | 'global' | 'folder')} the type of the role
 * @param index index of the role in its parent container
 */
function assignSid(roleType, index) {
    if (!['agent', 'global', 'folder'].includes(roleType)) {
        throw  new Error('Unknown Role Type');
    }

    const sid = document.getElementById(`assign-sid-${roleType}-${index}`).value;
    const roleName = document.getElementById(`${roleType}RoleContainer`).children[index].getAttribute('data-role-name');

    const params = new URLSearchParams();
    params.append('sid', sid);
    params.append('roleName', roleName);

    const url = `${rootURL}/folder-auth/assignSidTo${roleType[0].toUpperCase()}${roleType.substring(1)}Role`;
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onload = () => {
        if (request.status === 200) {
            alert('Sid added successfully.');
            location.reload();
        } else {
            alert('Unable to assign sid to the role.\n' + request.responseText);
        }

    };

    request.onerror = () => {
        alert('Unable to add the sid to the role: ' + request.responseText);
    };

    // see addrole.js
    if (typeof crumb !== 'undefined' && crumb.value) {
        request.setRequestHeader(crumb.name || 'Jenkins-Crumb', crumb.value);
    }
    request.send(params.toString());
}

/**
 * Removes a sid from a role.
 *
 * @param roleType {('agent' | 'global' | 'folder')} the type of the role
 * @param index index of the role in its parent container
 */
function removeSid(roleType, index) {
    if (!['agent', 'global', 'folder'].includes(roleType)) {
        throw  new Error('Unknown Role Type');
    }

    const sid = document.getElementById(`assign-sid-${roleType}-${index}`).value;
    const roleName = document.getElementById(`${roleType}RoleContainer`).children[index].getAttribute('data-role-name');

    const params = new URLSearchParams();
    params.append('sid', sid);
    params.append('roleName', roleName);

    const url = `${rootURL}/folder-auth/removeSidFrom${roleType[0].toUpperCase()}${roleType.substring(1)}Role`;
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onload = () => {
        if (request.status === 200) {
            alert('Sid removed successfully.');
            location.reload();
        } else {
            alert('Unable to remove the sid.\n' + request.responseText);
        }
    };

    request.onerror = () => {
        alert('Unable to remove the sid from the role: ' + request.responseText);
    };

    // see addrole.js
    if (typeof crumb !== 'undefined' && crumb.value) {
        request.setRequestHeader(crumb.name || 'Jenkins-Crumb', crumb.value);
    }
    request.send(params.toString());
}
