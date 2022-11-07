CREATE DATABASE router_holmes;
USE DATABASE router_holmes;
CREATE TABLE Diagnostics (Timestamp TIMESTAMP, Router_ID INT, Queued BIGINT, Served BIGINT, Temperature DOUBLE );


CREATE PIPELINE dev_diagnostics_1 AS LOAD DATA KAFKA '<confluent-workspace-url>/diagnostics' 
CONFIG '{
    "sasl.username": "<confluent-username>",         
     "sasl.mechanism": "PLAIN",          
     "security.protocol": "SASL_SSL",          
     "ssl.ca.location": "/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem"}' 
     CREDENTIALS '{"sasl.password": "<confluent-password>"}' 
     INTO TABLE Diagnostics 
     FORMAT JSON  (Timestamp <- timestamp,Router_id <- routerId, Queued <- queuedPackets,Served <- packetsServed, Temperature <- temperature);

CREATE TABLE People (ID INT, Name VARCHAR(255));

LOAD DATA INFILE IGNORE 1 LINES '/people.csv' INTO TABLE People FIELDS TERMINATED BY ',';



CREATE TABLE Router (ID INT, X_loc DOUBLE, Y_loc DOUBLE);
LOAD DATA INFILE '/router.csv' IGNORE 1 LINES INTO TABLE Router FIELDS TERMINATED BY ',';


Timestamp,Person_ID,Router_ID,Device,OS,Req_resource,Req_data

CREATE TABLE Request (Timestamp TIMESTAMP, Person_ID INT, Router_ID INT, Device VARCHAR(255), OS VARCHAR(255),Req_resource VARCHAR(255), Req_data BIGINT);

CREATE PIPELINE dev_request_1 AS LOAD DATA KAFKA '<confluent-workspace-url>/request'
CONFIG '{
    "sasl.username": "SXVZFAVMFOZQC4F2",         
     "sasl.mechanism": "PLAIN",          
     "security.protocol": "SASL_SSL",          
     "ssl.ca.location": "/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem"}' 
     CREDENTIALS '{"sasl.password": "<confluent-password>"}' 
     INTO TABLE Request 
     FORMAT JSON  (Timestamp <- timestamp,Person_ID <- personId, Router_ID <- routerId,Device <- device, OS <- os, Req_resource <- reqResource, Req_data <- reqData);