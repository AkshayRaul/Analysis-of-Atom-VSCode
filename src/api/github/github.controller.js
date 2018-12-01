import request from 'request-promise';
import fs from 'fs';
import config from '../../../config';

export const getEvents = (req, res) => {
    request('https://api.github.com/repos/Microsoft/vscode/events?per_page=100', {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        const filePath = config.__basedir + '/outputs/vscode/githubEventsData.json';
        fs.writeFile(filePath, data.data, (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    });
};

export const getIssues = (req, res) => {
    let limit = 9; //change limit for more pages
    let apiArr = [];
    for (let i=1;i<=limit; i++) {
        apiArr.push(callIssuesApi(i));
    }
    Promise.all(apiArr)
    .then(data => {
        console.log(data.length);
        return data.reduce((prev, curr) => prev.concat(curr));
    })
    .then(data => {
        const filePath = config.__basedir + '/outputs/vscode/githubIssuesData.json';
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    })
    .catch(err => console.log(err));
};

const callIssuesApi = (pageNo) => {
    return request('https://api.github.com/repos/Microsoft/vscode/issues?per_page=100&page='+pageNo, {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        return JSON.parse(data.data);
    });
};


export const getCommits = (req, res) => {
    request('https://api.github.com/repos/Microsoft/vscode/commits?per_page=100', {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        const filePath = config.__basedir + '/outputs/vscode/githubCommitsData.json';
        fs.writeFile(filePath, data.data, (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    });
};


export const getIssuesEvents = (req, res) => {
    request('https://api.github.com/repos/Microsoft/vscode/issues/events?per_page=100', {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        const filePath = config.__basedir + '/outputs/vscode/githubIssueEventsData.json';
        fs.writeFile(filePath, data.data, (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    });
};

export const getLabels = (req, res) => {
    request('https://api.github.com/repos/Microsoft/vscode/labels?per_page=100', {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        const filePath = config.__basedir + '/outputs/vscode/githubLabelsData.json';
        fs.writeFile(filePath, data.data, (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    });
};

export const getMilestones = (req, res) => {
    request('https://api.github.com/repos/Microsoft/vscode/milestones?per_page=100', {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        const filePath = config.__basedir + '/outputs/vscode/githubMilestonesData.json';
        fs.writeFile(filePath, data.data, (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    });
};

export const getPulls = (req, res) => {
    request('https://api.github.com/repos/Microsoft/vscode/pulls?per_page=100', {
        headers: {
            "User-Agent": "Node"
        },
        transform: function(body, response, resolveWithFullResponse) {
            return {'headers': response.headers, 'data': body};      
        }
    })
    .then(data => {
        console.log(data.headers.link);
        const filePath = config.__basedir + '/outputs/vscode/githubPullsData.json';
        fs.writeFile(filePath, data.data, (err) => {
            if (err) {
                res.end(err);
            } else {
                res.json({ status: 'success' });
            }
        });
    });
};