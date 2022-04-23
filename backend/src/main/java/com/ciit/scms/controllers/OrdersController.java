package com.ciit.scms.controllers;

import java.lang.reflect.Type;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ciit.scms.models.Category;
import com.ciit.scms.models.Customer;
import com.ciit.scms.models.Order;
import com.ciit.scms.models.OrderItem;
import com.ciit.scms.models.Product;
import com.ciit.scms.operations.OrderBuilder;
import com.ciit.scms.repositories.CustomerRepository;
import com.ciit.scms.repositories.OrderItemRepository;
import com.ciit.scms.repositories.OrderRepository;
import com.ciit.scms.repositories.ProductRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Controller
@ResponseBody
@RequestMapping(value= {"/api/orders"})
@CrossOrigin(origins="*")
public class OrdersController {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.POST,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String save(@RequestBody String payload) {
		
		System.out.println(payload);
		
		Gson gson = new Gson();
		HashMap<String,Object> data = new HashMap<String,Object>();
		data = gson.fromJson(payload, data.getClass());
		
		Integer customerId 	= (int)Double.parseDouble(data.get("customerId").toString());
//		Iterable<Integer> productId = Arrays.asList((int)Double.parseDouble(data.get("product").toString()));
		ArrayList<HashMap<String,Object>> orderItems = new ArrayList<HashMap<String,Object>>();
		Type listType = new TypeToken<List<HashMap<String, String>>>(){}.getType();

		orderItems = gson.fromJson(data.get("orderItems").toString(), listType);
		
		Boolean isOrderFulfilled = Boolean.parseBoolean(data.get("isOrderFulfilled").toString());
		
		Order o = new Order();
		
		if(data.get("id") != null) {
			Integer id = Integer.parseInt(data.get("id").toString());
			o = orderRepository.findById(id).get();
		}
		
		Customer c = customerRepository.findById(customerId).get();
		o.setCustomer(c);
		
		int isFulfilled = isOrderFulfilled ? 1 : 0; //ternary operator
		o.setIsOrderFulfilled(isFulfilled);
		
		
		orderRepository.save(o);
		
		for(HashMap<String, Object> temp : orderItems) { //temp is a var representing hashamp
			OrderItem objectToSave = new OrderItem();
			Product p = productRepository.findById((int)Double.parseDouble(temp.get("productId").toString())).get();
			objectToSave.setProduct(p);
			objectToSave.setQuantity((int)Double.parseDouble(temp.get("quantity").toString()));
			objectToSave.setOrder(o);
			objectToSave.setPrice(Double.parseDouble(temp.get("price").toString()));
			
			orderItemRepository.save(objectToSave);
		}
		
		return " { \"message\": \"ok\" } ";
	}
	
	@RequestMapping(
			value= {"","/"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins="*")
	public String index() {
		ArrayList<HashMap<String,Object>> orders = new ArrayList<HashMap<String,Object>>();
		Iterable<Order> orderResult = orderRepository.findAll();
		
		for(Order o: orderResult) {
			OrderBuilder builder = new OrderBuilder(o);
			HashMap<String,Object> orderdata = builder.getData();
			orders.add(orderdata);
		}
		
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("orders", orders);
		
		Gson gson = new Gson();
		String result = gson.toJson(data);
		
		return result;
	}
	
	@RequestMapping(
			value= {"/{id}"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public String show(@PathVariable Integer id) {
		Order order = orderRepository.findById(id).get();
		
		OrderBuilder builder = new OrderBuilder(order);
		HashMap<String,Object> orderdata = builder.getData();
		
		Gson gson = new Gson();
		String data = gson.toJson(orderdata);
		
		return data;
	}
	
	@RequestMapping(
			value= {"/{id}/delete"},
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins = "*")
	public String delete(@PathVariable Integer id) {
		
		//fetching product from database
		
		//if id does not exist, return invalid message
		//Product product = productRepository.findById(id).get();
		//productRepository.delete(product);
		
		orderRepository.deleteById(id);
		
		return " { \"message\": \"ok\" } ";
	}
	
}
