#! /bin/env bash
if ! command -v sensuctl &> /dev/null
then
    cd /tmp
    curl -sLO "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${SENSU_VERSION}/sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz" > /dev/null
    tar -xzf "sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz" -C /usr/local/bin/
    rm "sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz"
fi

# this should be conditionally run
sensuctl configure --non-interactive --namespace default --api-url ${SENSU_API_URL} --username ${SENSU_USERNAME} --password ${SENSU_PASSWORD}
export SENSU_API_KEY=$(sensuctl api-key grant admin | awk -F\/ '{print $6}')
echo "api key: $SENSU_API_KEY"
sensuctl create -f /opt/sensu/data/sample.yaml
sensuctl create -f /opt/sensu/data/check --namespace development

echo "sensu namespaces:"
sensuctl namespace list

cd /usr/src/app
REACT_APP_KEY=$SENSU_API_KEY npm start
