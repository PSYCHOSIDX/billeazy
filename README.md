# # BillEazy
Simple SaaS tool to manage electricity bills in North Goa


<img width="587" alt="Screenshot 2023-08-25 111859" src="https://github.com/PSYCHOSIDX/billeazy/assets/63893110/f44c9fb7-9dd4-42e9-9f8a-db858b9c5383">

## Link to Presentation : <a href='https://oneshield-my.sharepoint.com/:p:/p/sskamath/ESVYQ5k3vfpAo3isFI7CK3IB8QJfPdh09iuAPytCmf-pyQ?e=yZIF9D'>  Bill Eazy Presentation </a>

# ELECTRICITY BILLING SYSTEM 

 

## PROBLEM STATEMENT 

As part of this project, attendees have to create an electricity billing system for all the consumers of North Goa.  

This billing module should be able to generate bills for all the consumers based on the meter reading recorded from their premise. Meter readings that are captured by the field officers using a meter reading device can then be connected to the billing module to get the data in a flat file. This flat file can then be loaded into the system to store the data into the database. The billing should be done based on the consumer type (Domestic, Commercial or industrial), Sanctioned load & the subsidy provided by the government. 

 

## OBJECTIVE 1 

The key electricity distributor within Goa 

Electricity Department: The Electricity Department was created as a Govt. Department in the year 1963. The Electricity Department is the only licensee in the state of Goa for transmission and distribution of Electrical Energy. 

The Department does not have its own generation and purchases power from the Central Sector Power Stations of the National Thermal Power Corporation as per the allocation made by the Central Government. 

 

## Regulatory body that governs the generation and transmission of electricity in Goa 

Joint Electricity Regulatory Commission for the state of Goa and Union Territories: Consolidates the laws relating to generation, transmission, distribution, trading and use of electricity and generally for taking measures conducive to development of electricity industry, promoting competition therein, protecting interest of consumers and supply of electricity to all areas, rationalization of electricity tariff, ensuring transparent policies regarding subsidies, promotion of efficient and environmentally benign policies, constitution of Central Electricity Authority, Regulatory Commissions and establishment of Appellate Tribunal and for matters connected therewith or incidental thereto, The Electricity Act 2003 was enacted by Government of India. 

The Commission is a two-member body designated to function as an autonomous authority responsible for regulation of the power sector in the state of Goa and Union Territories of Andaman & Nicobar, Lakshadweep, Chandigarh, Daman & Diu, Dadra & Nagar Haveli and Puducherry. The powers and the functions of the Commission are as prescribed in the Electricity Act 2003. 

 

## List down at least two rules/ regulations that should be considered while recommending the solution. 

A table of electricity and energy

Description automatically generated 

 

Electricity Supply Code Regulations, 2018 5.26 - The Licensee shall also provide new avenues for applying for new connection or modification in existing connection through website, call centres, etc., which minimize the applicant’s interface with the utility during the process. 

(8B) Display of Tariff - The tariff for each category of consumers shall be displayed on distribution licensee's website and consumers shall be notified of change in tariff excluding fuel surcharge and other charges, at least one month ahead of time, through distribution licensee's website as well as through energy bills or Short Message Service or Mobile Application and the like. 

 

 

## Using the use-case template, write down the use-case to calculate different slabs for electricity consumption by consumers in Goa. 

<img width="230" alt="Screenshot 2023-08-25 112908" src="https://github.com/PSYCHOSIDX/devsnaps/assets/63893110/0437bf34-76a7-4b97-8ead-5c42c094768d">


 

 

# Use case diagram. 
<img width="242" alt="Screenshot 2023-08-25 113125" src="https://github.com/PSYCHOSIDX/devsnaps/assets/63893110/fd038558-828f-409b-96f5-a4f92170809c">
 

 

## OBJECTIVE 2 

Necessary specifications, features, and operations that will satisfy the functional requirements of the proposed system. 

To satisfy the functional requirements the system should be able to have the following modules with the specifications, 

### The admin should be able to  :

Add or modify details for consumers and agents. 

Generate and view bills which are pending or paid. 

Resolve tickets from the consumers if there are any issues in the bills. 

Update the electricity rates. 

### The agent should be able to  :

Login using the credentials. 

have a feature to upload the meter readings. 

### The consumer should be able to : 

Login using the credentials. 

View the pending or the paid bills. 

Report any discrepancies. 

Make payments. 

 

# HIGH-LEVEL DESIGN (HLD) DOCUMENT 

Description and Name of Each Module 

## Admin Module 

The admin module is handled by the admin within the department of electricity, this module holds more importance as it is used to effectively handle most of the tasks into the entire system. The admin can access, add, remove, and update the data in most of the modules.  

## Data Collector/Agent Module 

The data collector module is used for data collection and data integration i.e., it receives data from multiple agents in the form of flat files and stores it in a single database table. It can read the data from the flat files and store the data into the collections. 

## Billing Module 

The Billing Module serves as a tool for the calculation and generation of bills within the system. The total bill amount is calculated using the meter readings, current electricity rates, sanctioned load, tariffs based on consumer types, fppca1 etc.  

## Consumer Module 

The consumer module is designed to provide the consumers with seamless functionality, this module serves as a platform for performing various interactions with the system as a consumer of electricity. 

## Payment Module 

The payment module allows users to pay the bills and updates the status of the bills. 

Invoice Generation Module 

This module is used for generating invoices once the payments are successful and are used as billing documentation. 

 

# An outline of the functionality of every module 

## Admin Module  

The admin module has the following features: 

Login feature: The designated admin can login to the system 

Registering new consumers: The admin will be able to register new consumers. The consumers can then verify with the OTP. 

Registering new agents: The admin will be able to add new agents (employees). The agents can then verify with OTP. 

Displaying Consumer details: All the consumers details will be displayed to the admin. 

Displaying Employees (Agent) details: All the employee details will be displayed to the admin. 

Displaying Consumer Tickets: The issues raised by the consumers are displayed to the admin. 

Generating Bills: When new data is received from the agent, the admin can generate new bills. 

Displaying bills (Pending/Paid): All the pending and paid bills are displayed to the admin. 

Updating Electricity rates: The electricity rates can be updated by the admin. 

Discrepancy/Tickets Resolution: Admin can resolve discrepancies and make modifications to the bill readings on report from the consumer. 

 

## Data Collector/Agent Module 

This module has the following features, 

Allows uploading and reading data from flat files. 

Data read from flat files is stored in the tables. 

 

## Billing Module 

The Billing Module has the following features, 

Fetching the meter reading data from the collections. 

The module calculates the total billing amount by applying different billing slabs. 

Generate bills: the admin can generate bills. 

 

## Consumer Module 

Following are the features of the consumer module, 

The consumers can login once the admin has registered. 

Allows consumers to track both pending and paid bills. 

Consumers can report any discrepancies or concerns related to their bills. 

Payments can be made. 

 

## Payment Module 

The features of the payment module are, 

Integrated with Razorpay for hassle-free payments. 

Invoice is generated on payment. 

Payment status is updated. 

 

## Invoice Generation Module 

The features of this module are: 

The invoices are generated in pdf format. 

Include all the billing and payment details. 

The invoices can be exported and printed.  

 

 

## Interface relationship and dependencies between modules 
<img width="410" alt="Screenshot 2023-08-25 113520" src="https://github.com/PSYCHOSIDX/devsnaps/assets/63893110/548a6580-f1f3-436b-af61-139ffdbe44c0">


 

## Data Flow Diagrams 

<img width="352" alt="Screenshot 2023-08-25 113620" src="https://github.com/PSYCHOSIDX/devsnaps/assets/63893110/5b6e86d5-dd35-4c3d-b406-54265679e065">

<img width="366" alt="Screenshot 2023-08-25 113730" src="https://github.com/PSYCHOSIDX/devsnaps/assets/63893110/fe50b557-f39e-490e-9568-ca603b0fc2ad">

<img width="338" alt="Screenshot 2023-08-25 113714" src="https://github.com/PSYCHOSIDX/devsnaps/assets/63893110/d8228afb-c6e7-48b6-9639-97ca96dacc73">



# THANK YOU FOR READING !!

## Please star the repository if you like it and share .


