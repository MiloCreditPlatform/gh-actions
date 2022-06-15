#!/bin/bash
# Name: deployBucket.sh
# Purpose: Deploys a bucket to AWS S3 bucket with the name of the bucket passed as an argument.
# -----------------------------------------------------------------------------------

declare input_bucket_array=("$1")
declare input_command=("$2")

declare -a bucket_array="${input_bucket_array[@]}"

# Sync the bucket to S3
if [ $input_command == "sync" ]; then
    for bucket in "${bucket_array[@]}"
    do
        bucket_values=($bucket)
        echo "Syncing bucket: ${bucket_values[0]} to: ${bucket_values[1]}"
        aws s3 sync s3://${bucket_values[0]} ${bucket_values[1]}
    done
# Remove the bucket from AWS S3
elif [ $input_command == "remove" ]; then
    for bucket in "${input_bucket_array[@]}"
    do
        bucket_values=($bucket)
        echo "Removing bucket: ${bucket_values[0]}"
        aws s3 ls s3://${bucket_values[0]};
        # Validate the bucket exists
        # if [ aws s3 ls s3://${bucket_values[0]} ]; then
        echo "Bucket exists, removing bucket: ${bucket_values[0]}"
        aws s3 rm s3://${bucket_values[0]} --recursive
        # else
            # echo "Bucket does not exist, skipping..."
        # fi
    done
else
    echo "invalid command"
fi