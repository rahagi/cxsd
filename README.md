Fork of cxsd 
====

Changes:

1. Fixed the setup to work with more recent package versions as previous setup was broken due to deprecated https://github.com/typings/typings
2. Applied a fix https://github.com/formelio/cxsd/commit/e48c4f7c8eed7394b4b59c63efadf3a2c11cd348, such that when [xsd-to-ts](https://github.com/formelio/java-libs/tree/master/ivizibs/xsd-to-ts) is used on IviZIB definitions, fields that start with _, keep it in their name.
