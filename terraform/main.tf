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

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.slnchn_sketches_bucket.website_endpoint
    origin_id   = "S3-${aws_s3_bucket.slnchn_sketches_bucket.id}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.slnchn_sketches_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Environment = "production"
  }
}
