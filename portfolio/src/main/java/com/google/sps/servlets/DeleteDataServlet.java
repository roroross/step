package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Key;

import java.util.ArrayList;

import com.google.sps.data.Comment; // TO BE EDITED FOR COMMENTS CLASS
import java.util.List;

/** Servlet that deletes data */

@WebServlet("/delete-data")
public class DeleteDataServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //set up
        Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);

        //looping through the comments
        for (Entity entity : results.asIterable()) {
            Key key = entity.getKey();
            datastore.delete(key);
        }    
        //return empty response when done
        response.getWriter().println("");
    }

}
