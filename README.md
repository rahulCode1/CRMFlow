# CRMFlow

A full-stack leads management app where you can browse, search, add, edit & view details of leads.
Built with React frontend, Express/Node backend, Mongodb database.

---

## Demo Link

[Live Demo](https://crm-flow-sable.vercel.app)

---

## Quick Start

```
git clone  https://github.com/rahulCode1/CRMFlow.git
cd my-app
npm install
npm start
```

## Technologies

- React JS
- React Router
- Node JS
- Express
- Mongodb

## Demo Video

watch a walkthrough (6 minutes) of all the major features of this app:
[Loom Video](https://drive.google.com/file/d/1vU0BklskDqkmi81hU1WRfVzSTW-HklBo/view?usp=sharing)

---

## Features

**Home**

- Display list of all leads.
- Filter Leads

**Leads**

- Display list of all leads.
- Different filters & sort.

**Add Lead**

- Add new lead.

**Sales Agent**

- Get all sales agent.

**Add Agent**

- Add new Sales agent.

**Report**

- Lead report with chart.js

**Status**

- Leads via status

**Lead by Agents**

- Leads via sales agent.

**Setting**

- Manage sales agent & leads.

---

## API Reference

### **GET api/leads**

List of all leads
Sample Response

```
[{id, name, source, ...}, ...]
```

### **POST api/lead**<br>

Add new Lead
Sample Response

```
{id, name, source...}
```

### **GET api/lead/id**<br>

Lead details
Sample Response

```
{id, name, source...}
```

### **PATCH api/lead/id**<br>

Edit lead
Sample Response

```
{id, name, source...}
```

### **DELETE api/lead/id**<br>

Delete lead

### **POST api/lead/id/comments**<br>

Add comment on lead
Sample Response

```
{id, author, commentText, ...}
```

### **GET api/lead/id/comments**<br>

Get all comments
Sample Response

```
[{id, author, commentText, ...}, ...]
```

### **GET api/report/last-week**<br>

Get leads closed last week
Sample Response

```
{id, name, salesAgent, ...}
```

### **GET api/report/pipeline**<br>

Get active or closed lead.
Sample Response

```
{activeLeads, closedLeads}
```

### **GET api/report/closed-by-agent**<br>

Get lead closed by agent.
Sample Response

```
[
    {
        agent: [
            {
                id, name, status, ...
            }
        ]
    }
]
```

## **POST api/agent**<br>

Add new sales agent
Sample response

```
{name, email}
```

## **GET api/agent**<br>

Get all sales agent
Sample response

```
[{name, email}, ...]
```

## **DELETE api/agent/id**<br>

Delete sales agent
Sample response

## Contact

For bugs or feature request, please reach out to rahulkumawat50665@gmail.com
