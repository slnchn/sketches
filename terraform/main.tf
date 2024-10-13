provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "slnchn_sketches_bucket" {
  bucket = "slnchn-sketches-bucket"

  tags = {
    Name = "slnchn-sketches-bucket"
  }
}

resource "aws_s3_bucket_website_configuration" "slnchn_sketches_bucket" {
  bucket = aws_s3_bucket.slnchn_sketches_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  routing_rule {
    condition {
      http_error_code_returned_equals = "404"
    }

    redirect {
      replace_key_with = "index.html"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "slnchn_sketches_bucket" {
  bucket = aws_s3_bucket.slnchn_sketches_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


resource "aws_s3_bucket_policy" "slnchn_sketches_bucket" {
  bucket = aws_s3_bucket.slnchn_sketches_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.slnchn_sketches_bucket.arn}/*"
      },
    ]
  })
}
