#!/usr/bin/env python
"""Generates a stream to Kafka from a time series csv file.
"""

import argparse
import csv
import json
import sys
import time
from dateutil.parser import parse
from confluent_kafka import Producer
import socket


def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" %
              (str(msg.value()), str(err)))
    else:
        print("Message produced: %s" % (str(msg.value())))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('filename', type=str, help='Time series csv file.')
    parser.add_argument('topic',
                        type=str,
                        help='Name of the Kafka topic to stream.')
    parser.add_argument(
        '--speed',
        type=float,
        default=1,
        required=False,
        help='Speed up time series by a given multiplicative factor.')
    args = parser.parse_args()

    topic = args.topic
    p_key = args.filename

    conf = {
        'bootstrap.servers': '<Server endpoint>',
        'security.protocol': 'SASL_SSL',
        'sasl.mechanisms': 'PLAIN',
        'sasl.username': '<your confluent sasl username>',
        'sasl.password': '<your confluent workspace password>',
        'session.timeout.ms': 45000,
        'acks': 0
    }

    producer = Producer(conf)

    rdr = csv.reader(open(args.filename))
    next(rdr)  # Skip header
    firstline = True

    while True:

        try:

            if firstline is True:
                line = next(rdr, None)
                # timestamp, value = line1[0], float(line1[1])
                timestamp, personId, routerId, device, os, reqResource, reqData = line[
                    0], int(line[1]), int(
                        line[2]), line[3], line[4], line[5], int(line[6])
                # Convert csv columns to key value pair
                msg = {}
                msg['timestamp'] = timestamp
                msg['personId'] = personId
                msg['routerId'] = routerId
                msg['device'] = device
                msg['os'] = os
                msg['reqResource'] = reqResource
                msg['reqData'] = reqData
                # Convert dict to json as message format
                jresult = json.dumps(msg)
                firstline = False

                producer.produce(
                    topic,
                    key=p_key,
                    value=jresult,
                )

            else:
                line = next(rdr, None)
                d1 = parse(timestamp)
                d2 = parse(line[0])
                diff = ((d2 - d1).total_seconds()) / args.speed

                time.sleep(diff)
                # timestamp, value = line[0], float(line[1])
                timestamp, personId, routerId, device, os, reqResource, reqData = line[
                    0], int(line[1]), int(
                        line[2]), line[3], line[4], line[5], int(line[6])

                msg = {}
                msg['timestamp'] = timestamp
                msg['personId'] = personId
                msg['routerId'] = routerId
                msg['device'] = device
                msg['os'] = os
                msg['reqResource'] = reqResource
                msg['reqData'] = reqData
                print("Message produced:", msg)
                # result = {}
                # result[timestamp] = value
                jresult = json.dumps(msg)
                producer.produce(
                    topic,
                    key=p_key,
                    value=jresult,
                )

            producer.flush()

        except TypeError:
            sys.exit()


if __name__ == "__main__":
    main()
