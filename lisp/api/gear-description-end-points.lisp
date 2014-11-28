(in-package :savage-worlds-api)

(defun gear-get-all()
  (setf (hunchentoot:content-type*) "application/json") 
  (format nil "{\"gear\":~a}" (encode-json-to-string 
					   savage-worlds::gear-list)))

(defun gear-get-by-id()
  (setf (hunchentoot:content-type*) "application/json") 
  (let* ((id (parse-integer (getf *route-params* :id))))
    (format nil "{\"gear\":~a}" 
	    (encode-json-to-string 
	     (savage-worlds::find-setting-rule-by-id id)))))