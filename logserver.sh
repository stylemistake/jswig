#!/bin/bash
cd `dirname $0`

server_port="29550"

log() {
	echo "${0}: ${*}"
}

tcp_server() {
	while true; do
		log "listening on ${server_port}"
		nc -l ${server_port}
		ec=${?}
		if [ ${ec} -ne 0 ]; then
			log "error ${ec}, exiting..."
			exit ${ec}
		fi
		log "client disconnected, reconnecting..."
	done
}

from_stdin() {
	while true; do
		read line
		length=`echo -n "${line}" | wc -c`
		printf "0: %.8x" ${length} | xxd -r -g0
		echo -n ${line}
	done
}

cleanup() {
	trap - TERM QUIT INT EXIT
	echo && log "exiting..."
	exit
}

trap "cleanup" TERM QUIT INT EXIT

from_stdin | tcp_server

exit 0
