# BBSP Protocol Definition

## Abstract
The BBSP (BitBurner Socket Protocol) is a protocol designed for one purpose:
allowing players of the Bitburner videogame to use external editors for editing sourcefiles.

## Overview

### Background

The need for BBSP originates from the fact Bitburner allows players to hook up
an external editor (mostly Visual Studio Code) and/or
a file synchronization tool (bitburner-sync on npm is an example of this).
The method for this feature is using an HTTP API, with bitburner being the server.
These characteristics have at least two downsides worth mentioning;

1. Browser can't publish ports and thus browser users can't use this feature.
2. Since it's a one-way request protocol, the client is required to poll for changes.

BBSP hopes to resolve the above two drawbacks.

### Protocol overview

The protocol defines a JSON-based format over a websocket connection for asynchronous,
two-directional message passing between client and server.
Opposing how the original HTTP API works in Bitburner, the videogame is now the client instead of the server.
This allows browser users to enjoy the same benefit as the players using the Electron (Steam) version.

//The API has been designed to take advantage of it's underlying technology, websockets.
//Websockets are streams, and so BBSP takes the stance to let 

### Design philosophy

The main goals of BBSP are to achieve feature-parity between Bitburner versions.
While doing so the design originates from the philosophy "The simpler, the better.".
Simple protocols are easy to reimplement and optimize for.

It is expected to be reimplemented in a variety of programming languages and editors,
resulting in an implementation-independent protocol.

## Conformance

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

https://datatracker.ietf.org/doc/html/rfc2119

Implementations of this protocol are recommended to be used on complete, correct implementations of websockets, as defined in RFC 6455

https://datatracker.ietf.org/doc/html/rfc6455

This specification describes conformance criteria for two classes of products:
BBSP servers and BBSP clients.

## BBSP messages



BBSP message structure looks like:


## Connecting


## Client messages






## Server messages






https://stomp.github.io/stomp-specification-1.2.html




## protocol goals:
- stateless - any "interaction" should be allowed to happen in any order.
  - fully stateless -  "interactions" should be allowed to happen simultaneously.
- lowercase - anything like keywords is lowercase.
- kiss - simplicity > efficiency.
- multiclient - handle multiple gameclients at once
- many small over few big - rather send a bunch of small messages than a few big ones. Should keep the API simple.


## KEYWORDS
- request
- response (response to a request)
- denial
- push
- accept


- connect
- file
  - push
  - pushchunk (TBI)

```json
{
  "context" : "connect",
  "action"  : "keyrequest"
}
```

```json
{
  "context" : "file",
  "action"  : "push",

}

```

## Example of initial connection

:bb initiates connection
bb -> srv, request key
bb <- srv, response key
bb -> srv, accept key

bb <- srv, request key
bb -> srv, response key
bb <- srv, accept key

// No need to know about eachother if you accept eachother. Only send "denial" when key isn't allowed. BB/server should be allowed to ask for keys at any time.
// EDIT: accept is needed so that server and client know they have mutual trust?


## Examples of actual requests sent over wire

// Request, requested
{"request", "key"}

// Response, requested,
{"response", "key", "fwSDFSFYyy67558SFDFDSFSD578DF3"}

// Denial, why
{"denial", "key invalid"}

// Push, what, data
{"push", "file", <filename>, <filecontent>}


## Examples of "interactions" after events

### Legenda
- `:` event
- `>` code expressed from high level POV in natural language
- `{` JSON sent over the wire

### Example of file change

```
:file changes on disk
> send
{}
```